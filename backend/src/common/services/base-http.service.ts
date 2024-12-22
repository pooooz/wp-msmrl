import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeepPartial } from 'typeorm';

export interface BaseHttpDataResponse {
  [key: string]: any;
}

@Injectable()
export abstract class BaseHttpService<Entity extends BaseHttpDataResponse> {
  public domainUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    domain: string,
  ) {
    const serviceUrl = this.configService.get<string>('serviceUrl');
    this.domainUrl = `${serviceUrl}/${domain}`;
  }

  async create(createInputDto: DeepPartial<Entity>, ...rest: unknown[]) {
    console.log('createInputDto', createInputDto);
    const entity = await this.httpService.axiosRef.post<Entity>(
      this.domainUrl,
      createInputDto,
    );

    return entity.data;
  }

  async findAll() {
    const entities = await this.httpService.axiosRef.get<Array<Entity>>(
      this.domainUrl,
    );

    return entities.data;
  }

  async findById(id: number) {
    const entity = await this.httpService.axiosRef.get<Entity>(
      `${this.domainUrl}?id=${id}`,
    );

    return entity.data;
  }

  async remove(id: number) {
    const entity = await this.httpService.axiosRef.delete(
      `${this.domainUrl}?id=${id}`,
    );

    return entity.data;
  }
}
