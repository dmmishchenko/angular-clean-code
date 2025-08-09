import { TestBed } from "@angular/core/testing";
import { SyncService } from "./sync.service";

describe("SyncService", () => {
  let service: SyncService;
  const mockCb = () => {};

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SyncService] });
    service = TestBed.inject(SyncService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should set active state after join", () => {
    service.listen(mockCb);

    expect(service.isInSync).toBeTrue();
  });

  it("should raise error when join twice", () => {
    service.listen(mockCb);

    expect(() => {
      service.listen(() => {});
    }).toThrowError(`Channel exist already`);
  });

  it("should raise error when trying post without join", () => {
    expect(() => {
      service.postChange({});
    }).toThrowError("Channel doesn't exist");
  });

  it("should raise error when trying stop without join", () => {
    expect(() => {
      service.stop();
    }).toThrowError("No channel listened");
  });
});
