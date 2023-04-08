import { UniqueId } from './unique-id';
import { VersionType } from './version-type';
import { VersionUrl } from './version-url';

export type Version = {
  id: UniqueId;
  type: VersionType;
  url: VersionUrl;
  name: string;
};
