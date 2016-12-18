import exec from '../utils/exec'

import * as allPrompts from '../prompts'
import * as allRequirements from '../requirements'

export const requirements = [
  allRequirements.wpCli,
  allRequirements.wpCliDotenv
]

export const prompts = [
  allPrompts.dbName,
  allPrompts.dbUser,
  allPrompts.dbPassword,
  allPrompts.dbHost,
  allPrompts.wpEnv,
  allPrompts.wpHome,
  allPrompts.wpSiteurl,
  allPrompts.wpTitle,
  allPrompts.wpAdminName,
  allPrompts.wpAdminEmail
]

export function run (answers) {
  let cmds = [
    'wp dotenv init --with-salts',
    `wp dotenv set DB_NAME ${answers.dbName}`,
    `wp dotenv set DB_USER ${answers.dbUser}`,
    `wp dotenv set DB_PASSWORD ${answers.dbPassword}`,
    `wp dotenv set DB_HOST ${answers.dbHost}`,
    `wp dotenv set WP_ENV ${answers.wpEnv}`,
    `wp dotenv set WP_HOME ${answers.wpHome}`,
    `wp dotenv set WP_SITEURL ${answers.wpSiteurl}`,
    `wp core install --url=${answers.wpHome} --title='${answers.wpTitle}' --admin_user=${answers.wpAdminName} --admin_email=${answers.wpAdminEmail}`
  ]
  console.log('this is setupWordpress')
  return exec(cmds)
}
