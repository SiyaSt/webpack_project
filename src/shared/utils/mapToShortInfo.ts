import { ShortUserInformation, User } from "src/shared/types/user";

export const mapToShortInfo = (users: User[]): ShortUserInformation[] => {
  return users.map((user) => ({
    name: user.name,
    email: user.email,
    company: user.company.name,
    phone: user.phone,
  }));
};
