import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Problem } from "../models/problem.model.js";

const createProblem = asyncHandler(async (req, res) => {
    const {
        title, 
        description, 
        difficulty, 
        solution, 
        inputFormat, 
        outputFormat, 
        example, 
        explanation, 
        testcases, 
        testResults, 
        tags, 
        constraints, 
        notes, 
        createdBy, 
        isPrivate
    } = req.body;

    if (!title || !description || !difficulty || !testcases || !testResults || !tags || !createdBy ||!example || !explanation) {
        throw new ApiError(400, "All fields are required");
    }

    const problem = new Problem({
        title,
        description,
        difficulty,
        solution,
        inputFormat,
        outputFormat,
        example,
        explanation,
        testcases,
        testResults,
        tags,
        constraints,
        notes,
        createdBy,
        isPrivate,
    });

    await problem.save();
    return res.status(200).json(new ApiResponse(200, "Problem created", problem));
});

const updateProblem = asyncHandler(async (req, res) => {
    const { problemId, creatorId } = req.params;
    const problem = await Problem.findById(problemId);
    if (!problem) {
        throw new ApiError(404, "Problem not found");
    }
    if (problem.createdBy.toString() !== creatorId) {
        throw new ApiError(403, "You are not authorized to update this problem");
    }
    const {
        title,
        description,
        difficulty,
        solution,
        inputFormat,
        outputFormat,
        example,
        explanation,
        testcases,
        testResults,
        tags,
        constraints,
        notes,
        isPrivate
    } = req.body;

    problem.title = title || problem.title;
    problem.description = description || problem.description;
    problem.difficulty = difficulty || problem.difficulty;
    problem.solution = solution || problem.solution;
    problem.inputFormat = inputFormat || problem.inputFormat;
    problem.outputFormat = outputFormat || problem.outputFormat;
    problem.example = example || problem.example;
    problem.explanation = explanation || problem.explanation;
    problem.testcases = testcases || problem.testcases;
    problem.testResults = testResults || problem.testResults;
    problem.tags = tags || problem.tags;
    problem.constraints = constraints || problem.constraints;
    problem.notes = notes || problem.notes;
    problem.isPrivate = isPrivate || problem.isPrivate;

    await problem.save();
    return res.status(200).json(new ApiResponse(200, "Problem updated", problem));
});

const deleteProblem = asyncHandler(async (req, res) => {
    const { problemId, creatorId } = req.params;
    const problem = await Problem.findById(problemId);
    if (!problem) {
        throw new ApiError(404, "Problem not found");
    }
    if (problem.createdBy.toString() !== creatorId) {
        throw new ApiError(403, "You are not authorized to delete this problem");
    }

    await problem.remove();
    return res.status(200).json(new ApiResponse(200, "Problem deleted"));
});

const getProblem = asyncHandler(async (req, res) => {
    const { problemId } = req.params;
    const problem = await Problem.findById(problemId);
    if (!problem) {
        throw new ApiError(404, "Problem not found");
    }
    return res.status(200).json(new ApiResponse(200, "Problem retrieved", problem));
});

const getAllProblems = asyncHandler(async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 6;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    const difficulty = req.query.difficulty ? req.query.difficulty : null;
    const tags = req.query.tags ? req.query.tags.split(',') : null; // Parse tags from query string

    const query = {};
    if (difficulty) {
        query.difficulty = difficulty;
    }
    if (tags && tags.length > 0) {
        query.tags = { $in: tags };
    }

    const problems = await Problem.find(query)
        .skip(skip)
        .limit(limit)
        .populate("createdBy", "username fullName profileUrl");

    if (problems.length === 0) {
        return res
            .status(200)
            .json(new ApiResponse(200, "No problems found", null));
    }
    return res.status(200).json(new ApiResponse(200, "Problems found", problems));
});

export { createProblem, updateProblem, deleteProblem, getProblem, getAllProblems };
