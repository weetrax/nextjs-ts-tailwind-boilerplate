import { connectToDatabase } from '@/lib/database/index';
import { ironOptions } from '@/lib/session';
import { ResponseError } from '@/types';
import { User } from '@/lib/database/models/User';
import { withIronSessionApiRoute } from 'iron-session/next';

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  if (req.method === "POST") {
    connectToDatabase();
    const { email, password } = req.body;

    let error: ResponseError = {
      message: "",
    };

    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        error.message = "Utilisateur ou mot de passe incorrect.";
        return res.status(400).json(error);
      }
      user.comparePassword(
        password,
        async function (err: any, isMatch: boolean) {
          if (err) {
            error.message = "Oups, une erreur est survenue.";
            return res.status(500).json(error);
          }
          if (!isMatch) {
            error.message = "Utilisateur ou mot de passe incorrect."; //mot de passe
            return res.status(400).json(error);
          } else {
            req.session.user = user;
            await req.session.save();
            res.status(200).json(user);
          }
        }
      );
    } catch (err) {
      if (err) {
        error.message = "Oups, une erreur est survenue.";
        return res.status(500).json(error);
      }
    }

    // test a matching password
  }
}, ironOptions);
