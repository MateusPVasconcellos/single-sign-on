import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1656174405045 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Tenant" (
        "id" uuid NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "email" character varying(100) NOT NULL,
        "description" character varying(1000),
        "settings" jsonb,
        "activeKeyPair" jsonb,
        "rotatedKeyPair" jsonb,
        "expiredKeyPairs" jsonb,
        CONSTRAINT "PK_Tenant" PRIMARY KEY ("id"),
        UNIQUE ("email")
    );

    CREATE TABLE "Client" (
        "id" uuid NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "description" character varying(1000) NOT NULL,
        "authenticationFlow" jsonb,
        "tenantId" uuid NOT NULL,
        CONSTRAINT "PK_Client" PRIMARY KEY ("id"),
        CONSTRAINT "FK_Client_Tenant" FOREIGN KEY ("tenantId") REFERENCES "Tenant" (id)
    );

    CREATE TABLE "Account" (
        "id" uuid NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "active" BOOLEAN NOT NULL DEFAULT FALSE,
        "email" character varying(100) NOT NULL,
        "attributes" jsonb,
        "tenantId" uuid,
        CONSTRAINT "PK_Account" PRIMARY KEY ("id"),
        CONSTRAINT "FK_Account_Tenant" FOREIGN KEY ("tenantId") REFERENCES "Tenant" (id),
        UNIQUE ("email", "tenantId")
    );

    CREATE TABLE "Credential" (
        "id" uuid NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "username" character varying(100),
        "password" character varying(1000),
        "credentialType" character varying(100) NOT NULL,
        "accountId" uuid NOT NULL,
        "tenantId" uuid,
        CONSTRAINT "PK_Credential" PRIMARY KEY ("id"),
        CONSTRAINT "FK_Credential_Account" FOREIGN KEY ("accountId") REFERENCES "Account" (id),
        CONSTRAINT "FK_Credential_Tenant" FOREIGN KEY ("tenantId") REFERENCES "Tenant" (id),
        UNIQUE ("username", "tenantId")
    );

    CREATE TABLE "Subscription" (
        "id" uuid NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "permissions" jsonb,
        "accountId" uuid NOT NULL,
        "clientId" uuid NOT NULL,
        CONSTRAINT "PK_Subscription" PRIMARY KEY ("id"),
        CONSTRAINT "FK_Subscription_Account" FOREIGN KEY ("accountId") REFERENCES "Account" (id),
        CONSTRAINT "FK_Subscription_Client" FOREIGN KEY ("clientId") REFERENCES "Client" (id)
    );

    CREATE TABLE "PermissionSet" (
        "id" uuid NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "description" character varying(1000) NOT NULL,
        "tenantId" uuid NOT NULL,
        "clientId" uuid NOT NULL,
        CONSTRAINT "PK_PermissionSet" PRIMARY KEY ("id"),
        CONSTRAINT "FK_PermissionSet_Client" FOREIGN KEY ("clientId") REFERENCES "Client" (id),
        CONSTRAINT "FK_PermissionSet_Tenant" FOREIGN KEY ("tenantId") REFERENCES "Tenant" (id)
    );

    CREATE TABLE "Permission" (
        "id" uuid NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "label" character varying(20) NOT NULL,
        "description" character varying(1000),
        "parentPermissionId" uuid,
        "permissionSetId" uuid,
        CONSTRAINT "PK_Permission" PRIMARY KEY ("id"),
        CONSTRAINT "FK_Permission_Permission" FOREIGN KEY ("parentPermissionId") REFERENCES "Permission" (id),
        CONSTRAINT "FK_Permission_PermissionSet" FOREIGN KEY ("permissionSetId") REFERENCES "PermissionSet" (id),
        UNIQUE ("label", "permissionSetId")
    );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE "Permission";
    DROP TABLE "PermissionSet";
    DROP TABLE "Subscription";
    DROP TABLE "Credential";
    DROP TABLE "Account";
    DROP TABLE "Client";
    DROP TABLE "Tenant";
    `);
  }
}
