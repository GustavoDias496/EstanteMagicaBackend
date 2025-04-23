import * as Create from './Create';
import * as DeleteById from './DeleteById';
import * as GetAll from './GetAll';
import * as GetByid from './GetById';
import * as UpdateById from './UpdateById';

export const userController = {
    ...Create,
    ...DeleteById,
    ...GetAll,
    ...GetByid,
    ...UpdateById
};