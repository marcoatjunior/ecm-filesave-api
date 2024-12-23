import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Solicitações')
@Controller('solicitacoes')
export class SolicitacoesController {}
