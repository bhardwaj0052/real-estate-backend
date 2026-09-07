import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PropertiesModule } from './properties/properties.module';
import { SavedPropertiesModule } from './saved-properties/saved-properties.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/real-estate'),
    UsersModule,
    SavedPropertiesModule,
    AuthModule,
    PropertiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
