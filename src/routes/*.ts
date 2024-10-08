import { Link } from '../models.js';
import type { Route } from '../types.js';

export const routes: Route = (fastify, { config }, done) => {
    fastify.route({
        method: ['GET'],
        url: '*',
        handler: async (request, reply) => {
            const link = await Link.findOne({ slugs: request.url.split('?')[0]?.replace(/\//, '').toLowerCase() });
            if (!link) {
                reply.code(404).send('This short URL does not exist. ' +
                    'If you believe that this is an error, please contact the owner of the URL.' +
                    '\n\n' +
                    `${config.info.name} v${config.info.version} by ${config.info.author}` +
                    '\n' +
                    'https://github.com/thaddeuskkr/nova');
                return;
            }
            if (link.public) reply.code(307).redirect(link.url);
            else {
                const query = request.query as { password?: string; pw?: string; pass?: string };
                if (!query || (!query.password && !query.pw && !query.pass)) {
                    reply.code(401).send('This URL is password protected and you did not provide one in query parameters' +
                        '\n\n' +
                        `${config.info.name} v${config.info.version} by ${config.info.author}` +
                        '\n' +
                        'https://github.com/thaddeuskkr/nova');
                    return;
                }
                const password = query.password || query.pw || query.pass;
                if (password !== link.password) {
                    reply.code(401).send('Incorrect password' +
                        '\n\n' +
                        `${config.info.name} v${config.info.version} by ${config.info.author}` +
                        '\n' +
                        'https://github.com/thaddeuskkr/nova');
                    return;
                }
                reply.code(307).redirect(link.url);
            }
        },
    });
    done();
};
