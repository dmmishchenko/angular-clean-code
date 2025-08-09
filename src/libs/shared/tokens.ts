import { InjectionToken } from "@angular/core";
import { MessageBus } from "./util/interfaces/message-bus.interface";
import { MessageBusService } from "./data-access/message-bus.service";

export const MESSAGE_BUS_TOKEN = new InjectionToken<MessageBus>(
    "MessageBus",
    {
        providedIn: "root",
        factory: () => new MessageBusService()
    }
);