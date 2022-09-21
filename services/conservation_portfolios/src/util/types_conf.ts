import { Request, Response, Next } from 'restify';
import winston from 'winston';

export type Logger = winston.Logger;

export type RouterFunction = (req: Request, res: Response, next: Next) => void | Promise<void>;

export type EHFunction = (callback: RouterFunction) => RouterFunction;
