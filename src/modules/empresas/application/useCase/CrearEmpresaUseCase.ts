import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import {
  EMPRESA_REPOSITORY,
  type EmpresaRepositoryPort,
} from '../ports/output/empresaRepository.port';
import type { EmpresaResponseDto } from '../dto/empresaResponse.dto';
import { CrearEmpresaDto } from '../dto/crearEmpresa.dto';

@Injectable()
export class CrearEmpresaUseCase {
  constructor(
    @Inject(EMPRESA_REPOSITORY)
    private readonly empresaRepository: EmpresaRepositoryPort,
  ) {}

  async ejecutar(
    datos: CrearEmpresaDto,
    rolAdministrador: number | null,
  ): Promise<EmpresaResponseDto> {
    if (rolAdministrador !== 1) {
      throw new ForbiddenException('No tiene permisos para crear empresas');
    }

    const nombre = datos.nombre?.trim();
    if (!nombre) {
      throw new BadRequestException('El nombre de la empresa es obligatorio');
    }

    const empresa = await this.empresaRepository.crear({
      nombre,
      ruc: datos.ruc?.trim() || null,
      esquema: datos.esquema?.trim() || null,
      logo: datos.logo?.trim() || null,
    });

    return {
      id: empresa.id,
      nombre: empresa.nombre,
      ruc: empresa.ruc,
      estado: empresa.estado,
      esquema: empresa.esquema ?? null,
      logo: empresa.logo ?? null,
      fechaCreacion: empresa.fechaCreacion,
    };
  }
}
