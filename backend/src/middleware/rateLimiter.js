import ratelimit from "../config/upstach.js"

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-limit-key")

        if (!success) {
            return res.status(429).json({
                message: "Too many requests , please try again later"
            })
        }

        next()
    } catch (error) {
        console.error("Error in the RateLimiter ", error)

        next(error)
    }
}

export default rateLimiter