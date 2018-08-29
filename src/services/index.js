import request from "../box-ui/util/request";

const feedbackService = {
  postFeedback(data) {
    return request({
      method: "POST",
      url: "https://ccnubox.muxixyz.com/api/feedback/",
      data: data
    });
  }
};

export default feedbackService;
