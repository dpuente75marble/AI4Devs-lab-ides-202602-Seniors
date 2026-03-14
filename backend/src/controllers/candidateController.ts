import { Request, Response, NextFunction } from 'express';
import prisma from '../index';

export const createCandidate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      education,
      experience,
    } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        message: 'firstName, lastName and email are required',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Invalid email format',
      });
    }

    const existingCandidate = await prisma.candidate.findUnique({
      where: { email },
    });

    if (existingCandidate) {
      return res.status(409).json({
        message: 'A candidate with this email already exists',
      });
    }

    const file = req.file;

    const candidate = await prisma.candidate.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        address: address || null,
        education: education || null,
        experience: experience || null,
        cvFileName: file ? file.originalname : null,
        cvFilePath: file ? file.path : null,
      },
    });

    return res.status(201).json({
      message: 'Candidate created successfully',
      candidate,
    });
  } catch (error) {
    next(error);
  }
};
