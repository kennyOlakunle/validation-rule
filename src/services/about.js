const profile = () => {
  const self = {
    name: 'Kehinde Abe',
    github: '@kennyOlakunle',
    email: 'olakunlemuyiwa@gmail.com',
    mobile: '07039876838',
    twitter: '@thecodezs',
  };

  self.respond = () => ({
    message: 'Rule-Validation API',
    status: 'success',
    data: self,
  });

  return self.respond();
};

module.exports = profile;
