import type { MastoConfig } from '../config';
import { version } from '../decorators';
import type { Account } from '../entities';
import type { Http } from '../http';
import { Paginator } from '../paginator';
import { IterableRepository } from './iterable-repository';
import type { DefaultPaginationParams } from './repository';

export class BlockRepository extends IterableRepository<Account> {
  constructor(
    private readonly http: Http,
    readonly version: string,
    readonly config: MastoConfig,
  ) {
    super();
  }

  /**
   * Blocked users
   * @param params Array of Account
   * @return Query parameter
   * @see https://docs.joinmastodon.org/methods/accounts/blocks/
   */
  @version({ since: '0.0.0' })
  override getIterator(
    params?: DefaultPaginationParams,
  ): Paginator<DefaultPaginationParams, Account[]> {
    return new Paginator(this.http, `/api/v1/blocks`, params);
  }
}
