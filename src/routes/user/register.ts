import { User } from '../../models';
import type { Route } from '../../types';
import bcrypt from 'bcrypt';

export const routes: Route = (fastify, { $ }, done) => {
    fastify.route({
        method: ['POST'],
        url: '/api/users/register',
        handler: async (request, reply) => {
            const body = request.body as { username?: string; email?: string; password?: string; icon?: string };
            if (!body) {
                reply.code(400).send({ error: true, message: 'Missing request body' });
                return;
            }
            if (!body.username || !body.email || !body.password) {
                reply.code(400).send({ error: true, message: 'Missing required fields' });
                return;
            }
            const existingUser = await User.findOne({ $or: [{ username: body.username }, { email: body.username }] });
            if (existingUser) {
                reply.code(400).send({ error: true, message: 'Username or email already in use' });
                return;
            }
            const user = new User({
                username: body.username,
                email: body.email,
                password: bcrypt.hashSync(body.password, 10),
                icon: body.icon || null,
                token: null,
                admin: false
            });
            await user.save();
            reply.code(201).send({ error: false, message: 'Registration successful' });
            $.debug(`Registered ${user.username} (${user.email})`);
        }
    });
    done();
};
