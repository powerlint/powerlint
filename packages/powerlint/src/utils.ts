import chalk from 'chalk'
import Table from 'cli-table'
import { EOL } from 'os'

export function newTable() {
    return new Table({
        chars: {
            'top': '', 'top-mid': '', 'top-left': '', 'top-right': ''
            , 'bottom': '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': ''
            , 'left': '', 'left-mid': '', 'mid': '', 'mid-mid': ''
            , 'right': '', 'right-mid': '', 'middle': ' '
        },
        style: { 'padding-left': 0, 'padding-right': 1 },
    })
}

export function errorHandler(err: Error) {
    console.error(`${chalk.bold.bgRedBright(' FATAL ')} An error was encountered executing the command:`, err.message, chalk.gray(err.stack ?? '').replace(`${err.name}: ${err.message}`, ''), EOL)
    process.exit(2)
}

export function actionRunner(fn: (...args: any[]) => Promise<any>) {
    return (...args: any[]) => fn(...args).catch(errorHandler)
}
