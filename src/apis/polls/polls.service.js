import PollModel from "../../model/polls.model";

class PollsService {
    constructor () {
        this.pollModel = new PollModel();
    }

    async getAllPolls() {
        try {
            const polls = await this.pollModel.getAllPolls();
            return polls;
        } catch (error) {
            throw error;
        }
    }

    async getPollById(id) {
        try {
            const poll = await this.pollModel.getPollById(id);
            return poll;
        } catch (error) {
            throw error;
        }
    }
    
    async createPoll (poll) {
        try {
            const result = await this.pollModel.createPoll(poll);
            return result;
        } catch (error) {
            throw error;
        }
    }
    
    async updatePoll(poll) {
        try {
            const result = await this.pollModel.updatePoll(poll);
            return result;
        } catch (error) {
            throw error;
        }
    }
    
    async deletePoll(id) {
        try {
            const result = await this.pollModel.deletePoll(id);
            return result;
        } catch (error) {
            throw error
        }
    }
    
    async getAllOptions(idPoll) {
        try {
            const options = await this.pollModel.getAllOptions(idPoll);
            return options;
        } catch (error) {
            throw error;
        }
    }
    
    async getOptionById(optionId) {
        try {
            const option = await this.pollModel.getOptionById(optionId);
            return option;
        } catch (error) {
            throw error;
        }
    }

    async createOption(pollId, option) {
        try {
            const result = await this.pollModel.createOption(pollId, option);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateOption(optionId, option) {
        try {
            const result = await this.pollModel.updateOption(optionId, option);
            return result;
        } catch (error) {
            throw error;
        }
    }
    
    async deleteOption(optionId) {
        try {
            const result = await this.pollModel.deleteOption(optionId);
            return result;
        } catch (error) {
            throw error;
        }
    }
    
    async votePoll(userId, optionId) {
        try {
            const result = await this.pollModel.votePoll(userId, optionId);
            return result;
        } catch (error) {
            throw error;
        }
    }
    
    async unVotePoll(optionId, userid) {
        try {
            const result = await this.pollModel.unVotePoll(optionId, userid);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async checkUserVote(optionId, userId) {
        try {
            const option = await this.pollModel.checkUserVote(optionId, userId);
            return option;
        } catch (error) {
            throw error;
        }
    }

    async getVotesForOption(optionId) {
        try {
            const votes = await this.pollModel.getVotesForOption(optionId);
            return votes;
        } catch (error) {
            throw error;
        }
    }

    async checkUserVote(optionId, userId) {
        try {
            const votes = await this.pollModel.checkUserVote(optionId, userId);
            return votes;
        } catch (error) {
            throw error;
        }
    }
}

export default new PollsService();