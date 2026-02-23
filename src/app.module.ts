import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ProfileModule } from './profile/profile.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { FeatureFlagModule } from './feature-flag/feature-flag.module';
import { FeatureAccessModule } from './feature-access/feature-access.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ProfileFeatureDataModule } from './profile-feature-data/profile-feature-data.module';
import { FeatureDataModule } from './feature-data/feature-data.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 300,
      max: 100,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: 'src/schema.gql',
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('BDD_PATH'),
        dbName: configService.get<string>('BDD_NAME'),
      }),
      inject: [ConfigService],
    }),
    ProfileModule,
    FeatureFlagModule,
    FeatureAccessModule,
    AuthModule,
    ProfileFeatureDataModule,
    FeatureDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
