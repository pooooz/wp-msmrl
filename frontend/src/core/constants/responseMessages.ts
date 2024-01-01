export enum ResponseMessagesEnum {
  INSUFFICIENT_DATA = 'Insufficient data',

  ADMIN_NOT_FOUND = 'Admin not found',
  ADMIN_INSUFFICIENT_PARAMS = "URL hasn't adminId",
  ADMIN_ALREADY_EXISTS = 'User with this login already exists',
  ADMIN_CREATED = 'Admin created',
  ADMIN_UPDATED = 'Admin updated',
  ADMIN_REMOVED = 'Admin removed',

  CURRENT_DISCIPLINE_NOT_FOUND = 'Current discipline not found',
  CURRENT_DISCIPLINE_INSUFFICIENT_PARAMS = "URL hasn't currentDisciplineId",
  CURRENT_DISCIPLINE_CREATED = 'Current discipline created',
  CURRENT_DISCIPLINE_UPDATED = 'Current discipline updated',
  CURRENT_DISCIPLINE_REMOVED = 'Current discipline deleted',
  CURRENT_DISCIPLINE_CANNOT_BE_DELETED_BECAUSE_OF_TASK = 'This current discipline has tasks',
  CURRENT_DISCIPLINE_CANNOT_BE_DELETED_BECAUSE_OF_DISCIPLINE_TEACHER = 'This current discipline has assigned teachers',

  DISCIPLINE_NOT_FOUND = 'Discipline not found',
  DISCIPLINE_INSUFFICIENT_PARAMS = "URL hasn't disciplineId",
  DISCIPLINE_ALREADY_EXISTS = 'Discipline with this name and control form already exists',
  DISCIPLINE_CREATED = 'Discipline created',
  DISCIPLINE_UPDATED = 'Discipline updated',
  DISCIPLINE_REMOVED = 'Discipline deleted',
  DISCIPLINE_UNSUPPORTED_CONTROL_FORM = 'Unsupported form of discipline control',
  DISCIPLINE_CANNOT_BE_DELETED_BECAUSE_OF_CURRENT_DISCIPLINE = 'This discipline has current discipline',

  DISCIPLINE_TEACHER_NOT_FOUND = 'Discipline with teacher not found',
  DISCIPLINE_TEACHER_ALREADY_EXIST = 'This teacher already conducts this type of classes in this discipline',
  DISCIPLINE_TEACHER_INSUFFICIENT_PARAMS = "URL hasn't disciplineTeacherId",
  DISCIPLINE_TEACHER_CREATED = 'Discipline with teacher created',
  DISCIPLINE_TEACHER_UPDATED = 'Discipline with teacher updated',
  DISCIPLINE_TEACHER_REMOVED = 'Discipline with teacher deleted',
  DISCIPLINE_TEACHER_UNSUPPORTED_FORM_OF_CONDUCTING_CLASSES = 'Unsupported form of conducing classes',

  GROUP_NOT_FOUND = 'Group not found',
  GROUP_INSUFFICIENT_PARAMS = "URL hasn't groupId",
  GROUP_ALREADY_EXISTS = 'Group with this name already exists',
  GROUP_CREATED = 'Group created',
  GROUP_UPDATED = 'Group updated',
  GROUP_REMOVED = 'Group removed',
  GROUP_CANNOT_BE_DELETED_BECAUSE_OF_STUDENT = 'There are students in this group',
  GROUP_CANNOT_BE_DELETED_BECAUSE_OF_CURRENT_DISCIPLINE = 'This group has a current discipline',

  RESULT_NOT_FOUND = 'Result not found',
  RESULT_INSUFFICIENT_PARAMS = "URL hasn't resultId",
  RESULT_CREATED = 'Result created',
  RESULT_UPDATED = 'Result updated',
  RESULT_REMOVED = 'Result removed',

  SIGN_IN_NOT_FOUND = 'User not found',
  SIGN_IN_INVALID_LOGIN_OR_PASSWORD = 'Invalid login or password',
  SIGN_IN_UNKNOW_USER_ROLE = 'Uncnow user role',

  SPECIALIZATION_NOT_FOUND = 'Specialization not found',
  SPECIALIZATION_INSUFFICIENT_PARAMS = "URL hasn't specializationId",
  SPECIALIZATION_ALREADY_EXISTS = 'Specialization with this name already exists',
  SPECIALIZATION_CANNOT_BE_DELETED_BECAUSE_OF_GROUP = 'This specialty has groups',
  SPECIALIZATION_CREATED = 'Specialization created',
  SPECIALIZATION_UPDATED = 'Specialization updated',
  SPECIALIZATION_REMOVED = 'Specialization removed',

  STUDENT_NOT_FOUND = 'Student not found',
  STUDENT_INSUFFICIENT_PARAMS = "URL hasn't studentId",
  STUDENT_CREATED = 'Student created',
  STUDENT_UPDATED = 'Student updated',
  STUDENT_REMOVED = 'Student removed',
  STUDENT_CANNOT_BE_DELETED_BECAUSE_OF_TASK = 'This student has the results of the task',

  TASK_NOT_FOUND = 'Task not found',
  TASK_INSUFFICIENT_PARAMS = "URL hasn't taskId",
  TASK_ALREADY_EXISTS = 'Such a task already exists',
  TASK_NO_CHANGE_RIGHTS = 'You cannot change this task',
  TASK_NO_DELETION_RIGHTS = 'You cannot delete this task',
  TASK_CREATED = 'Task created',
  TASK_UPDATED = 'Task updated',
  TASK_REMOVED = 'Task removed',

  TEACHER_NOT_FOUND = 'Teacher not found',
  TEACHER_INSUFFICIENT_PARAMS = "URL hasn't teacherId",
  TEACHER_ALREADY_EXISTS = 'User with this login already exists',
  TEACHER_CREATED = 'Teacher created',
  TEACHER_UPDATED = 'Teacher updated',
  TEACHER_REMOVED = 'Teacher removed',
  TEACHER_CANNOT_BE_DELETED_BECAUSE_OF_TASK = 'This teacher has created tasks',
  TEACHER_CANNOT_BE_DELETED_BECAUSE_OF_DISCIPLINE_TEACHER = 'This teacher has discipline',

  DONT_HAVE_ACCESS = "You don't have access",
  MIN_MAX_PASSWORD_LENGTH = 'Password must be from 4 to 20 characters',
}