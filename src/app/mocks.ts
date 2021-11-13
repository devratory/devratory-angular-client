import { of } from "rxjs";
const METHOD_NAMES = ['createUser', 'sendNotification', 'createEvent', 'deleteUser', 'createLeftTesticle'];
export function getMockMethod(id: number) {
  const USER_DEFINITION = {
    profile: {
      type: {
        firstName: {
          type: 'string',
          optional: false,
        },
        lastName: {
          type: 'string',
          optional: false,
        },
        speaks: {
          type: ['string'],
          optional: true,
        },
        avatar: {
          type: 'string',
          optional: true,
        },
        dob: {
          type: 'date',
          optional: true,
        },
        weight: {
          type: 'number',
          optional: true,
        },
        height: {
          type: 'number',
          optional: true,
        },
        gender: {
          type: 'enum',
          enum: ['female', 'male', 'other', 'private'],
          optional: true,
        },
        about: {
          type: 'string',
          optional: true,
        },
      },
      optional: false,
    },
    status: {
      type: 'enum',
      enum: ['PendingActivation', 'Active', 'Disabled', 'Deleted'],
      optional: true,
    },
    loginType: {
      type: 'enum',
      enum: ['EmailPassword', 'Google'],
      optional: false,
    },
  };
  return {
    $$type: 'MS_CALL',
    ms: '@anyteam/user-ms:1.0.1',
    method: {
      msName: '@anyteam/user-ms:1.0.1',
      name: METHOD_NAMES[id] || id.toString(),
      type: 'MessagePattern',
      pattern: '@user/create',
      input: {
        name: 'registerVm',
        description: 'User object to create',
        optional: false,
        type: USER_DEFINITION,
      },
      output: {
        name: 'createdUser',
        description: '',
        type: {
          status: {
            type: 'number',
            optional: false,
          },
          message: {
            type: 'string',
            optional: true,
          },
          data: {
            optional: true,
            type: {
              ...USER_DEFINITION,
              email: {
                type: 'string',
                optional: false,
              },
              role: {
                type: 'enum',
                enum: ['Admin', 'User'],
                optional: false,
              },
              devices: {
                type: ['string'],
                optional: false,
              },
              preferences: {
                optional: false,
                type: [
                  {
                    name: {
                      type: 'string',
                      optional: false,
                    },
                    value: {
                      type: 'string',
                      optional: false,
                    },
                    userId: {
                      type: 'string',
                      optional: false,
                    },
                  },
                ],
              },
            },
          },
          errors: {},
        },
      },
    },
  };
}


export function getMockMethods(count:number) {
  return Array(count).fill('').map((_, i) => getMockMethod(i));
}
