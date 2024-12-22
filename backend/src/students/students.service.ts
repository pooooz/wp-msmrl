import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm';

import { GetStudentResponseData, Student } from './entities/student.entity';
import { CreateStudentInputDto } from './dto/create-student.dto';
import { Group } from 'src/groups/entities/group.entity';
import { BaseTypeORMService } from 'src/common/services/base-typeorm.service';
import { HttpService } from '@nestjs/axios';
import { BaseHttpService } from 'src/common/services/base-http.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StudentsService extends BaseHttpService<GetStudentResponseData> {
  constructor(httpService: HttpService, configService: ConfigService) {
    super(httpService, configService, 'students');
  }
}
