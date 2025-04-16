import * as Create from './Create';
import * as DeleteById from './DeleteById';

export const UserProvider = {
    ...Create,
    ...DeleteById
}