import { rest } from "msw";

export const handlers = [
    rest.get("https://www.googleapis.com/books/v1", (_, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                completed: false,
            })
        );
    }),
];
