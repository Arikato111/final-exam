import { Request, Response } from "express";
import db from "../models/prismaClient";
const WishlistController = {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async index(req, res) {
    try {
      const wishlists = await db.wishlist.findMany({
        where: { user_id: Number(req.user.id) },
      });
      res.json({ status: 101, wishlists });
    } catch (err) {
      res.json({ status: 100, message: "found some error" });
    }
  },
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async create(req, res) {
    try {
      const { id } = req.body;
      if (!id) throw 200;
      const check = await db.wishlist.findFirst({
        where: {
          AND: { user_id: Number(req.user.id), product_id: Number(id) },
        },
      });
      if (check) throw 200;
      await db.wishlist.create({
        data: {
          user_id: Number(req.user.id),
          product_id: Number(id),
        },
      });
      res.json({ status: 201, message: "add wishlist success" });
    } catch (err) {
      console.log(err);
      res.json({ status: 200, message: "found some error on server" });
    }
  },
};

export default WishlistController;
