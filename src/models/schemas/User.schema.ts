import { ObjectId } from 'mongodb'
import { UserVerifyStatus } from '~/constants/enums'

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginBody:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: quyen6@gmail.com
 *         password:
 *           type: string
 *           example: Quyen123!
 *
 *     SuccessAuthentication:
 *       type: object
 *       properties:
 *         access_token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjVjNGQzNzVmNmRmODA1Mjg0MzFhMzY5IiwidG9rZW5fdHlwZSI6MCwidmVyaWZ5IjoxLCJpYXQiOjE3MDg4Mzg2MTIsImV4cCI6MTcwODg0OTQxMn0.UvIAb2AyWumohMcxCqnXKFAmw559D23jzjVyjyPB1_4
 *         refresh_token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjVjNGQzNzVmNmRmODA1Mjg0MzFhMzY5IiwidG9rZW5fdHlwZSI6MSwidmVyaWZ5IjoxLCJpYXQiOjE3MDg4Mzg2MTIsImV4cCI6MTcxNzQ3ODYxMn0.FMRTl04z4OegPxyZ1wWO_Py-4Cyz06OxZ1nY_Xr2yGs
 *
 *     InvalidInput:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Validation error
 *         email:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               example: field
 *             value:
 *               type: string
 *               example: quyen6@gmail.com
 *             msg:
 *               type: string
 *               example: Email or password is incorrect
 *             path:
 *               type: string
 *               example: email
 *             location:
 *               type: string
 *               example: body
 *     UserInfo:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: MonggoId
 *           example: 65c4d375f6df80528431a369
 *         name:
 *           type: string
 *           example: quyen
 *         email:
 *           type: string
 *           example: quyen6@gmail.com
 *         date_of_birth:
 *           type: string
 *           format: ISO8601
 *           example: 2023-12-31T11:01:31.323Z
 *         created_at:
 *           type: string
 *           format: ISO8601
 *           example: 2024-02-08T13:13:25.523Z
 *         updated_at:
 *           type: string
 *           format: ISO8601
 *           example: 2024-02-08T14:53:54.709Z
 *         verify:
 *           $ref: '#/components/schemas/UserVerifyStatus'
 *         twitter_circle:
 *           type: array
 *           items:
 *             type: string
 *             format: MonggoId
 *             example: 65b4e0f4513e0e1c8b34da1a
 *         bio:
 *           type: string
 *           example: This is my bio
 *         location:
 *           type: string
 *           example: VietNam
 *         website:
 *           type: string
 *           example: www.example.com
 *         username:
 *           type: string
 *           example: user65c4d375f6df80528431a369
 *         avatar:
 *           type: string
 *           example: http://image.jpg
 *         cover_photo:
 *           type: string
 *           example: http://image.jpg
 *
 *     UserVerifyStatus:
 *       type: number
 *       example: 1
 *       description: User Verify Status
 *       enum: [Unverified, Verified, Banned]
 */

interface UserType {
  _id?: ObjectId
  name: string
  email: string
  date_of_birth: Date
  password: string
  created_at?: Date
  updated_at?: Date
  email_verify_token?: string
  forgot_password_token?: string
  verify?: UserVerifyStatus
  twitter_circle?: ObjectId[]
  bio?: string // optional
  location?: string // optional
  website?: string // optional
  username?: string // optional
  avatar?: string // optional
  cover_photo?: string // optional
}
class User {
  _id?: ObjectId
  name: string
  email: string
  date_of_birth: Date
  password: string
  created_at: Date
  updated_at: Date
  email_verify_token: string // jwt hoặc ' nếu đã xác thực email
  forgot_password_token: string //jwt hoặc ' nếu đã xác thực email
  verify: UserVerifyStatus
  twitter_circle: ObjectId[] // danh sách id của những người mà user này cho phép xem được tweet
  bio: string
  location: string
  website: string
  username: string
  avatar: string
  cover_photo: string

  constructor(user: UserType) {
    const date = new Date()
    this._id = user._id
    this.name = user.name || ''
    this.email = user.email
    this.date_of_birth = user.date_of_birth || new Date()
    this.password = user.password
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
    this.email_verify_token = user.email_verify_token || ''
    this.forgot_password_token = user.forgot_password_token || ''
    this.verify = user.verify || UserVerifyStatus.Unverified
    this.twitter_circle = user.twitter_circle || []
    this.bio = user.bio || ''
    this.location = user.location || ''
    this.website = user.website || ''
    this.username = user.username || ''
    this.avatar = user.avatar || ''
    this.cover_photo = user.cover_photo || ''
  }
}

export default User
