import Database from "../database/query.js";
import pool from "../config/dbConfig";

class PollModel {
  constructor() {
    this.db = new Database();
  }

    async getAllPolls() {
        try {
            return await this.db.select('SELECT * FROM POLLS');
        } catch (error) {
            throw error;
        }
    }

    async getPollById(id) {
        try {
            const polls = await this.db.select('SELECT * FROM POLLS WHERE ID = ?', [id]);
            return polls[0];
        } catch (error) {
            throw error;
        }
    }

    async createPoll(poll) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const pollData  = {
                TITLE: poll.title,
                DESCRIPTION: poll.description,
                USER_ID: poll.userId,
            };

            const pollId = await this.db.insert('POLLS', pollData);

            if (poll.options && poll.options.length > 0) {
                const optionsRecords = poll.options.map((option) => ({
                    POLL_ID: pollId,
                    OPTION_TEXT: option,
                }));
                
                for (const option of optionsRecords) {
                    await this.db.insert('OPTIONS', option);
                }
            }
                
            await connection.commit();
            return { pollId, options: poll.options };
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    async updatePoll(poll) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const data = {
                TITLE: poll.title,
                DESCRIPTION: poll.description,
            };

            const result = await this.db.update('POLLS', data, 'ID = ?', [poll.id]);

            await connection.commit();
            return result;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    async deletePoll(id) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const options = this.getAllOptions(id);

            if (options.length > 0 ) {
                const optionsIds = options.map((option) => option.id);

                await this.db.delete('VOTES', 'OPTION_ID IN (?)', [optionsIds]);

                await this.db.delete('OPTIONS', 'POLL_ID = ?', [id]);
            }

            const result = await this.db.delete('POLLS', id);
            await connection.commit();

            return result;
        } catch (error) {
            await connection.rollback();
            throw error;
          } finally {
            connection.release();
          }
    }

    async getPollOptions(pollId) {
        try {
            return await this.db.select('SELECT * FROM OPTIONS WHERE POLL_ID = ?', [pollId]);
        } catch (error) {
            throw error;
        }
    }

    async createOption(pollId, option) {
        try {
            const data = {
                OPTION_TEXT: option,
                POLL_ID: pollId,
            };

            return await this.db.insert('OPTIONS', data);
        } catch (error) {
            throw error;
        }
    }

    async updateOption(optionId, option) {
        try {
            const data = {
                OPTION_TEXT: option,
            };
            console.log(data);

            return await this.db.update('OPTIONS', data, 'ID = ?',  [optionId]);
        } catch (error) {
            throw error;
        }
    }

    async deleteOption(id) {
        try {
            return await this.db.delete('OPTIONS', 'ID = ?', [id]);
        } catch (error) {
            throw error;
        }
    }

    async getOptionById(optionId) {
        try {
            const options = await this.db.select('SELECT * FROM OPTIONS WHERE ID = ?', [optionId]);
            return options[0];
        } catch (error) {
            throw error;
        }
    }

    async checkUserVote(optionId, userId) {
        try {
            const votes = await this.db.select('SELECT * FROM VOTES WHERE OPTION_ID = ? AND USER_ID = ?', [optionId, userId]);
            return votes[0];
        } catch (error) {
            throw error;
        }
    }

    async votePoll(userId, optionId) {
        try {
            const vote = {
                OPTION_ID: optionId,
                USER_ID: userId,
            };
            
            return await this.db.insert('VOTES', vote);
        } catch (error) {
            throw error;
        }
    }

    async getAllOptions(idPoll) {
        try {
            return await this.db.select('SELECT * FROM OPTIONS WHERE POLL_ID = ?', [idPoll]);
        } catch (error) {
            throw error;
        }
    }

    async getVotesForOption(optionId) {
        try {
            return await this.db.select('SELECT * FROM VOTES WHERE OPTION_ID = ?', [optionId]);
        } catch (error) {
            throw error;
        }
    }

    async unVotePoll(optionId, userId) {
        try {
            const condition = 'OPTION_ID = ? AND USER_ID = ?';
            const params = [optionId, userId];
            return await this.db.delete('VOTES', condition, params);
        } catch (error) {
            throw error;
        }
    }

    async checkUserVote(optionId, userId) {
        try {
            const votes = await this.db.select('SELECT * FROM VOTES WHERE OPTION_ID = ? AND USER_ID = ?', [optionId, userId]);
            return votes[0];
        } catch (error) {
            throw error;
        }
    }
}

export default PollModel;
