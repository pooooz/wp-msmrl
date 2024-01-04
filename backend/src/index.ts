import express, { Request, Response } from 'express';
import cors from 'cors';

import { AppDataSource } from "./configs/typeorm.config";
import { adminRouter } from './routes/admin/adminRoute';
import { signInRouter } from './routes/sign-in/signInRouter';
import { teacherRouter } from './routes/teacher/teacherRoute';
import { specializationRouter } from './routes/specialization/specializationRoute';
import { groupRouter } from './routes/group/groupRoute';
import { studentRouter } from './routes/student/studentRoute';
import { disciplineRouter } from './routes/discipline/disciplineRouter';
import { currentDisciplineRouter } from './routes/currentDiscipline/currentDisciplineRouter';
import { disciplineTeacherRouter } from './routes/disciplineTeacher/disciplineTeacherRouter';
import { taskRouter } from './routes/task/taskRouter';
import { resultRouter } from './routes/result/resultRouter';
import { PORT } from './constants';
import { corsOptions } from './configs/cors';

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use('/teachers', teacherRouter); // +
app.use('/admins', adminRouter); // +
app.use('/sign-in', signInRouter); // +
app.use('/specializations', specializationRouter); // +
app.use('/groups', groupRouter); // +
app.use('/students', studentRouter); // +
app.use('/disciplines', disciplineRouter); // +
app.use('/currentDisciplines', currentDisciplineRouter); // +
app.use('/disciplineTeachers', disciplineTeacherRouter);
app.use('/tasks', taskRouter);
app.use('/results', resultRouter);

const main = async () => {
  try {
    await AppDataSource.initialize();

    app.listen(PORT, () => {
      console.log(`Server start on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

main();

export default app;
