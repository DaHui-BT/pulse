import { TagService } from "../TagService"
import { UserService } from "../UserService"


const tagService = TagService.getInstance()

const tags = await tagService.findTags()
console.log(tags)
// console.log(tagService.findTags())
// console.log(tagService.createTag({
//   resource: TagResource.TAG,
//   action: TagAction.CRATE,
//   description: 'update article tag',
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   isDeleted: true
// }))
// console.log((await UserService.getInstance().findUsers()).data?.users[0]._id)
// console.log(tagService.createTag({
//   resource: TagResource.TAG,
//   action: TagAction.UPDATE,
//   description: 'update article tag',
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   isDeleted: true
// }))

// console.log(tagService.createTag({
//   resource: TagResource.TAG,
//   action: TagAction.DELETE,
//   description: 'delete article tag',
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   isDeleted: true
// }))

// console.log(tagService.createTag({
//   resource: TagResource.TAG,
//   action: TagAction.READ,
//   description: 'read article tag',
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   isDeleted: true
// }))


// const tag = tags.data?.tags[0]
// let per
// tag?._id && (per = await tagService.findTagById(tag?._id))

// console.log(per)

// let user_id = (await UserService.getInstance().findUsers()).data?.users[0]._id

// tags.data?.tags.forEach(tag => {
//   tagService.updateTag(tag._id, {createdBy: user_id})
// })
// let updated
// tag?._id && (updated = await tagService.updateTag(tag?._id, {
//   // description: 'article create tag'
//   isDeleted: true
// }))

// console.log(updated)

// let deleted
// tag?._id && (deleted = await tagService.deleteById(tag?._id))
// console.log(deleted)

export {}
