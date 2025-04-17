import * as Create from './Create';
import * as DeleteById from './DeleteById';
import * as GetAll from './Create';
import * as GetById from './GetById';
import * as UpdateById from './UpdateById';

export const UserProvider = {
    ...Create,
    ...DeleteById,
    ...GetAll,
    ...GetById,
    ...UpdateById
}