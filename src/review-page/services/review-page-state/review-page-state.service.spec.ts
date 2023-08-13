import { TestBed } from "@angular/core/testing";
import { ReviewPageStateService } from "./review-page-state.service";
import { SyncService } from "../sync/sync.service";
import { RouteQueryStateService } from "../route-query-state.service";
import {
  ROUTE_QUERY_STATE_SERVICE_TOKEN,
  SYNC_SERVICE_TOKEN,
} from "@application/tokens";
import { RouterTestingModule } from "@angular/router/testing";
import { StateChanges } from "@application/services/page-state.interface";
import { take } from "rxjs";
import { PageState } from "@application/models/page-state";

describe("ReviewPageStateService", () => {
  let service: ReviewPageStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        ReviewPageStateService,
        { provide: SYNC_SERVICE_TOKEN, useClass: SyncService },
        {
          provide: ROUTE_QUERY_STATE_SERVICE_TOKEN,
          useClass: RouteQueryStateService,
        },
      ],
    });
    service = TestBed.inject(ReviewPageStateService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should throw error when changes empty", () => {
    expect(() => {
      service.setState({});
    }).toThrowError("Empty state changes");
  });

  it("should set new state", (done: DoneFn) => {
    const changes: StateChanges = {
      activeVersionId: 1,
      playlist: [],
    };

    const expectedState: PageState = {
      activeVersionId: 1,
      playlist: [],
    };

    service.setState(changes);

    service.state$.pipe(take(1)).subscribe((state) => {
      expect(state).toEqual(expectedState);
      done();
    });
  });
});
