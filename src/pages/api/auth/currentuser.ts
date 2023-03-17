import { ironOptions } from '@/lib/session';
import { withIronSessionApiRoute } from 'iron-session/next';

export default withIronSessionApiRoute(
    function currentUserRoute(req, res) {
        if (req.method === "GET") {
            res.send({ user: req.session.user });
        }
    },
    ironOptions
);