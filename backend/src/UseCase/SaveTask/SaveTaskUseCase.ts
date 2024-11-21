import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class SaveTaskUseCase
  implements UseCase<Promise<Task>, [dto: SaveTaskDto]> 
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    // Validate the name field
    if (typeof dto.name !== 'string' || dto.name.trim().length === 0) {
      throw new Error('Validation failed: Name must be a non-empty string.');
    }    

    try {
      // Save the task and return the result
      return await this.taskRepository.save({
        id: dto.id,
        name: dto.name,
      });
    } catch (error) {
      throw new BadRequestException(`Failed to save task: ${error.message}`);
    }
  }
}
