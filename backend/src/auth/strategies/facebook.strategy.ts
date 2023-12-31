import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { Injectable } from '@nestjs/common';
import getServerConfig from '../../config/configurations/server.config';
import { SocialUserModel } from '../models/social-user.model';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    console.log(getServerConfig());
    super({
      clientID: getServerConfig().facebook.clientId,
      clientSecret: getServerConfig().facebook.clientSecret,
      callbackURL: `http://${getServerConfig().host}:${
        getServerConfig().port
      }/auth/facebook/redirect`,
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails } = profile;
    const user: SocialUserModel = {
      email: emails[0].value,
      accessToken,
      name: name.givenName + ' ' + name.familyName,
    };
    done(null, user);

  }
}
