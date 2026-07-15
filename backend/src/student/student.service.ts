import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import { MongoServerError } from "mongodb";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { StudentRepository } from "./interfaces/student.interface";
import { StudentStatus } from "./schemas/student.schema";

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async create(createStudentDto: CreateStudentDto) {
    if (!createStudentDto) {
      throw new BadRequestException("Student payload is required.");
    }

    await this.ensureNoDuplicates(createStudentDto.email, createStudentDto.studentId);

    try {
      return await this.studentRepository.createStudent({
        ...createStudentDto,
        email: createStudentDto.email.toLowerCase(),
        status: createStudentDto.status ?? StudentStatus.ACTIVE
      });
    } catch (error) {
      this.handlePersistenceError(error, "create");
    }
  }

  async findAll() {
    return this.studentRepository.findAll();
  }

  async findOne(id: string) {
    const student = await this.studentRepository.findById(id);

    if (!student) {
      throw new NotFoundException(`Student with id ${id} was not found.`);
    }

    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    if (!updateStudentDto || Object.keys(updateStudentDto).length === 0) {
      throw new BadRequestException("At least one field must be provided for update.");
    }

    const currentStudent = await this.findOne(id);
    const nextEmail = updateStudentDto.email?.toLowerCase() ?? currentStudent.email;
    const nextStudentId = updateStudentDto.studentId ?? currentStudent.studentId;

    if (updateStudentDto.email || updateStudentDto.studentId) {
      await this.ensureNoDuplicates(nextEmail, nextStudentId, id);
    }

    try {
      const updatedStudent = await this.studentRepository.updateStudent(id, {
        ...updateStudentDto,
        ...(updateStudentDto.email ? { email: updateStudentDto.email.toLowerCase() } : {}),
        status: updateStudentDto.status ?? currentStudent.status
      });

      if (!updatedStudent) {
        throw new NotFoundException(`Student with id ${id} was not found.`);
      }

      return updatedStudent;
    } catch (error) {
      this.handlePersistenceError(error, "update");
    }
  }

  async remove(id: string) {
    const deletedStudent = await this.studentRepository.deleteStudent(id);

    if (!deletedStudent) {
      throw new NotFoundException(`Student with id ${id} was not found.`);
    }

    return deletedStudent;
  }

  private async ensureNoDuplicates(email: string, studentId: string, currentId?: string) {
    const [existingEmail, existingStudentId] = await Promise.all([
      this.studentRepository.findByEmail(email),
      this.studentRepository.findByStudentId(studentId)
    ]);

    if (existingEmail && String(existingEmail._id) !== currentId) {
      throw new ConflictException(`Email ${email} already exists.`);
    }

    if (existingStudentId && String(existingStudentId._id) !== currentId) {
      throw new ConflictException(`Student ID ${studentId} already exists.`);
    }
  }

  private handlePersistenceError(error: unknown, operation: "create" | "update"): never {
    if (error instanceof ConflictException || error instanceof BadRequestException || error instanceof NotFoundException) {
      throw error;
    }

    if (error instanceof MongoServerError && error.code === 11000) {
      const duplicatedField = Object.keys(error.keyValue ?? {})[0] ?? "field";
      throw new ConflictException(`Duplicate ${duplicatedField} value detected.`);
    }

    throw new InternalServerErrorException(`Failed to ${operation} student.`);
  }
}
