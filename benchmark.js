import http from 'k6/http'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const HOST = "http://localhost:8009"

export default function () {
  let login = http.get(`${HOST}/admin/login/`, { tags: { name: "Get login form" } })
  login.submitForm({
    formSelector: 'form',
    fields: { username: 'admin', password: 'changeme' }
  })

  http.get(`${HOST}/admin/pages/3/`, { tags: { name: "Get listing page" } })
  http.get(`${HOST}/admin/pages/34/edit/`, { tags: { name: "Get edit page" } })
}

export function handleSummary(data) {
  data.metadata = {}
  data.metadata.git_sha = __ENV.GIT_SHA
  data.metadata.git_ref = __ENV.GIT_REF_NAME

  return {
    "summary.json": JSON.stringify(data),
    "summary.html": htmlReport(data),
  };
}
