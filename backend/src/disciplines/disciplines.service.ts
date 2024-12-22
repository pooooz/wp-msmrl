import { Injectable } from '@nestjs/common';
import { GetDisciplineResponseData } from './entities/discipline.entity';
import { BaseHttpService } from 'src/common/services/base-http.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class DisciplinesService extends BaseHttpService<GetDisciplineResponseData> {
  constructor(httpService: HttpService, configService: ConfigService) {
    super(httpService, configService, 'disciplines');
  }
}
