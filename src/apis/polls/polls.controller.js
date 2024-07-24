import PollModel from "../../model/polls.model";
import PollsService from "./polls.service";

class PollsController {
    async getAllPolls(req, res, next) {
        try {
            const polls = await PollsService.getAllPolls();
            return res.status(200).send({
                data: polls,
            });
        } catch (error) {
            next(error);
        }
    }

    async createPoll (req, res, next) {
        try {
            const poll = {
                title: req.body.title,
                description: req.body.description,
                userId: req.user.id,
                options: req.body.options,
            };
            const result = await PollsService.createPoll(poll);
            return res.status(201).send({
                message: "Poll created successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async updatePoll(req, res, next) {
        try {
            
            const pollId = req.params.id;
            if (!pollId) {
                return res.status(400).send({
                    message: "Poll ID is required",
                });
            }
            
            const poll = {
                id: req.params.id,
                title: req.body.title,
                description: req.body.description,
            };

            if (!poll.title) {
                return res.status(400).send({
                    message: "Poll title is required",
                });
            }

            const result = await PollsService.updatePoll(poll);
            return res.status(200).send({
                message: "Poll updated successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async deletePoll(req, res, next) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).send({
                    message: "Poll ID is required",
                });
            }

            const checkPoll = await PollsService.getPollById(id);
            if (!checkPoll) {
                return res.status(400).send({
                    message: "Poll not found",
                });
            }

            const result = await PollsService.deletePoll(id);
            return res.status(200).send({
                message: "Poll deleted successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async getDetailPoll(req, res, next) {
        try {
            const id = req.params.id;
    
            const poll = await PollsService.getPollById(id);
    
            if (!poll) {
                return res.status(400).send({
                    message: "Poll not found",
                });
            }
    
            const options = await PollsService.getAllOptions(id);
    
            const optionsWithVotes = [];
    
            for (const option of options) {
                const votes = await PollsService.getVotesForOption(option.ID);
                optionsWithVotes.push({
                    id: option.ID,
                    optionText: option.OPTION_TEXT,
                    votesCount: votes.length,
                });
            }
            
            const result = {
                pollId: poll.ID,
                title: poll.TITLE,
                description: poll.DESCRIPTION,
                options: optionsWithVotes,
            };
            
            return res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }
    

    async createOption(req, res, next) {
        try {
            const pollId = req.params.id;
            if (!pollId) {
                return res.status(400).send({
                    message: "Poll ID is required",
                });
            }

            const option = req.body.option;

            if (!option || option.length === 0) {
                return res.status(400).send({
                    message: "Option are required",
                });
            }

            const result = await PollsService.createOption(pollId, option);
            return res.status(200).send({
                message: "Option create successfully",
                data: result,
            });
        } catch (error) {
           next(error); 
        }   
    }

    async deleteOption(req, res, next) {
        try {
            const optionId = req.params.id;
            if (!optionId) {
                return res.status(400).send({
                    message: "Option ID are required",
                });
            }

            const option = await PollsService.getOptionById(optionId);
            if (!option) {
                return res.status(400).send({
                    message: "Option not found",
                });
            }

            const result = await PollsService.deleteOption(optionId);
            return res.status(200).send({
                message: "Option deleted successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async updateOption(req, res, next) {
        try {
            const optionId = req.params.id;
            if (!optionId) {
                return res.status(400).send({
                    message: "Option ID are required",
                });
            }

            const option = req.body.option;
            console.log(option);

            if (!option || option.length === 0) {
                return res.status(400).send({
                    message: "Option are required",
                });
            }

            const result = await PollsService.updateOption(optionId, option);
            return res.status(200).send({
                message: "Option updated successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async votePoll(req, res, next) {
        const optionId = req.params.idOption;
        try {
            if (!optionId) {
                return res.status(400).send({
                    message: "Option ID are required",
                });
            }

            const option = await PollsService.getOptionById(optionId);
            if (!option) {
                return res.status(400).send({
                    message: "Option not found",
                });
            }

            const checkVote = await PollsService.checkUserVote(optionId, req.user.id);
            if (checkVote) {
                return res.status(400).send({
                    message: "Vote failed",
                });
            }
            
            const result = await PollsService.votePoll(req.user.id, optionId);

            return res.status(200).send({
                message: "Vote submitted successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async unVotePoll(req, res, next) {
        const optionId = req.params.idOption;
        try {
            if (!optionId) {
                return res.status(400).send({
                    message: "Option ID are required",
                });
            }

            const option = await PollsService.getOptionById(optionId);
            if (!option) {
                return res.status(400).send({
                    message: "Option not found",
                });
            }
            
            const checkVote = await PollsService.checkUserVote(optionId, req.user.id);
            if (!checkVote) {
                return res.status(400).send({
                    message: "UnVote failed",
                });
            }

            const result = await PollsService.unVotePoll(optionId, req.user.id);
            return res.status(200).send({
                message: "UnVote submitted successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async multiVoteUnvote(req, res, next) {
        try {
            const options = req.body.options;
            if (!options || options.length === 0) {
                return res.status(400).send({
                    message: "Options are required",
                });
            }

            for (const option of options) {
                if (option.vote) {
                    const checkVote = await PollsService.checkUserVote(option.id, req.user.id);
                    if (!checkVote) {
                        await PollsService.votePoll(req.user.id, option.id);
                    }
                } else {
                    const checkVote = await PollsService.checkUserVote(option.id, req.user.id);
                    if (checkVote) {
                        await PollsService.unVotePoll(option.id, req.user.id);
                    }
                }
            }

            return res.status(200).send({
                message: "Vote/Unvote submitted successfully",
            });
        } catch (error) {
            next(error);
        }
    } 
}

export default new PollsController();