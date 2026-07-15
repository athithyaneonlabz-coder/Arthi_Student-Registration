import { Type } from "class-transformer";
import { IsDate, IsEmail, IsIn, IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";
import { StudentStatus } from "../schemas/student.schema";

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  studentId!: string;

  @Type(() => Date)
  @IsDate()
  dateOfBirth!: Date;

  @IsString()
  @IsNotEmpty()
  department!: string;

  @IsInt()
  @Min(1)
  @Max(4)
  year!: 1 | 2 | 3 | 4;

  @IsString()
  @IsIn([StudentStatus.ACTIVE, StudentStatus.INACTIVE])
  status?: StudentStatus;
}
