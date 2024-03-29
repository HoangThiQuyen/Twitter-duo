export const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name length must be from 1 to 100',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect',
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required',
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Password length must be from 6 to 50',
  PASSWORD_MUST_BE_STRONG:
    'Password must be 6-50 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Confirm password length must be from 6 to 50',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Cofirm password must be 6-50 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must be the same as password',
  DATE_OF_BIRTH_MUST_BE_ISO8601: 'Date of birth must be ISO8601',
  LOGIN_SUCCESS: 'Login success',
  REGISTER_SUCCESS: 'Register success',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token is invalid',
  REFRESH_TOKEN_IS_NOT_EXIST: 'Refresh token is not exist',
  LOGOUT_SUCCESS: 'Logout successfully!',
  ACCESS_TOKEN_IS_INVALID: 'Access token is invalid',
  USER_NOT_FOUND: 'User not found',
  EMAIL_ALREADY_VERIFY_BEFORE: 'Email already verify before',
  EMAIL_VERIFY_SUCCESS: 'Email verify success',
  RESEND_VERIFY_EMAIL_SUCCESS: 'Resend verify email success',
  CHECK_EMAIL_TO_RESET_PASSWORD: 'Check email to reset password',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Forgot password token is required',
  VERIFY_FORGOT_PASSWORD_SUCCESS: 'Verify forgot password success',
  FORGOT_PASSWORD_TOKEN_IS_INVALID: ' Forgot password token is invalid',
  RESET_PASSWORD_SUCCESS: 'Reset password success',
  GET_ME_SUCCESS: 'Get my profile success',
  USER_NOT_VERIFIED: 'User not verified',
  BIO_MUST_BE_A_STRING: 'Bio must be a string',
  BIO_LENGTH: 'Bio length must be from 1 to 200',
  LOCATION_MUST_BE_A_STRING: 'Location must be a string',
  LOCATION_LENGTH: 'Location length must be from 1 to 200',
  WEBSITE_MUST_BE_A_STRING: 'Website must be a string',
  WEBSITE_LENGTH: 'Website length must be from 1 to 200',
  USERNAME_MUST_BE_A_STRING: 'Username must be a string',
  USERNAME_IS_INVALID:
    'Username must be 4-15 characters long and contain only letters, numbers, underscores, and not only numbers',
  USERNAME_EXISTED: 'Username existed',
  IMG_URL_MUST_BE_A_STRING: 'Image url must be a string',
  IMG_URL_LENGTH: 'Image url length must be from 1 to 400',
  UPDATE_ME_SUCCESS: 'Update me success',
  GET_PROFILE_SUCCESS: 'Get profile success',
  FOLLOW_SUCCESS: 'Follow success',
  USER_ID_IS_INVALID: 'User Id is invalid',
  FOLLOWED: 'Followed',
  ALREADY_UNFOLLOWED: 'Already unfollowed',
  UNFOLLOW_SUCCESS: 'Unfollow success',
  OLD_PASSWORD_IS_NOT_MATCH: 'Old password is not match',
  CHANGE_PASSWORD_SUCCESS: 'Change password success',
  GMAIL_NOT_VERIFIED: 'Google mail not verified',
  UPLOAD_SUCCESS: 'Upload success',
  REFRESH_TOKEN_SUCCESS: 'Refresh token success'
} as const

export const TWEETS_MESSAGES = {
  INVALID_TYPE: 'Invalid type',
  INVALID_AUDIENCE: 'Invalid audience',
  PARENT_ID_MUST_BE_A_VALID_TWEET_ID: 'Parent_is must be a valid tweet_id',
  PARENT_ID_MUST_BE_NULL: 'Parent_id must be null',
  CONTENT_MUST_BE_A_NON_EMPTY_STRING: 'Content must be a non empty string',
  CONTENT_MUST_BE_EMPTY_STRING: 'Content must be empty string',
  HASHTAGS_MUST_BE_AN_ARRAY_OF_STRING: 'Hashtags must be an array of string',
  MENTIONS_MUST_BE_AN_ARRAY_OF_USER_ID: 'Mentions must be an array of user_id',
  MEDIAS_MUST_BE_AN_ARRAY_OF_MEDIA_OBJECT: 'Medias must be an array of media object',
  CREATE_TWEET_SUCCESS: 'Create tweet success',
  INVALID_TWEET_ID: 'Invalid tweet id',
  TWEET_NOT_FOUND: 'Tweet not found',
  GET_TWEET_SUCCESS: 'Get tweet success',
  TWEET_IS_NOT_PUBLIC: 'Tweet is not public',
  GET_TWEET_CHILDREN_SUCCESS: 'Get tweet children success',
  LIMIT_INVALID: 'Limit <= 100 and >= 1',
  PAGE_INVALID: 'Page >= 1',
  GET_NEWFEEDS_SUCCESS: 'Get newfeeds success'
} as const

export const BOOKMARKS_MESSAGES = {
  BOOKMARK_TWEET_SUCCESS: 'Bookmark tweet success',
  UNBOOKMARK_TWEET_SUCCESS: 'Unbookmark tweet success'
} as const

export const LIKES_MESSAGES = {
  LIKE_TWEET_SUCCESS: 'Like tweet success',
  UNLIKE_TWEET_SUCCESS: 'Unlike tweet success'
} as const

export const SEARCH_MESSAGES = {
  SEARCH_SUCCESS: 'Search success',
  CONTENT_MUST_BE_STRING: 'Content must be string',
  PEOPLE_FOLLOW_MUST_BE_0_OR_1: 'People follow must be 0 or 1'
}
