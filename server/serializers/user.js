export const serializeUser = (user) => ({
  id: user._id.toString(),
  email: user.email,
  name: user.name,
  preferredCurrency: user.preferredCurrency,
  birthDate: user.birthDate,
  phone: user.phone,
  wishes: user.wishes.map((wishId) => wishId.toString()),
});
