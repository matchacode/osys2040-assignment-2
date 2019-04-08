const messages = await Chat.getMessages()

  // TODO: create like model
  // TODO: get like count from like model
  const likeCount = 0
  // TODO: get whether signed in user likes this from model
  const iLikeThis = true

  res.render('messages', { messages, likeCount, iLikeThis })
})

router.post('/chat/:messageId/like', async function userLikes(req, res, next) {
  console.log('req.body.like:', req.body.like)
  console.log('req.params:', req.params)
  console.log('req.locals:', req.locals)

  // TODO: if (req.body.like) add like to model
  await Likes.createLikes(req.params.messageId, res.locals.signedInAs)
  // TODO: else remove like from model

  res.redirect('/chat')
})

router.post('/chat/create-message', async function createMessage(req, res, next) {
  if (!res.locals.signedInAs) {
    return next(createError(401))
  }

  const message = req.body.message
  if (!message) {
    return next(createError(400, 'missing message'))
  }

  await Chat.createMessage(res.locals.signedInAs, {
    message: message,
  })

  res.redirect('/chat')
})

module.exports = router
