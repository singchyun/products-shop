import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Admin {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property({ default: true })
  enabled: boolean = true;

  @Property({ nullable: true, type: 'date' })
  last_login?: Date;

  @Property({ type: 'text[]', default: '{}' })
  roles: string[] = [];
}
