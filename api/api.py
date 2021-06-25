import requests

class API():
    def __init__(self, token):
        self.base_url="https://api.bitrise.io/v0.1/"
        self.token=token
        self.headers={"Authorization": "{}".format(token)}

    def list_builds(self, app_slug, status, after, before):
        path = "{}apps/{}/builds".format(self.base_url, app_slug)
    
        payload = {}

        if status is not None:
            payload['status'] = status
        if after is not None:
            payload['after'] = after
        if before is not None:
            payload['before'] = before


        resp = requests.get(path, params = payload, headers=self.headers)
        if resp.status_code != 200:
            raise Exception('Request to {} failed with code {} and response body {}'.format(resp.url, resp.status_code, resp.text))
        return resp.text

    def describe_build(self, app_slug, build_slug):
        path = "{}apps/{}/builds/{}".format(self.base_url, app_slug, build_slug)

        resp = requests.get(path, headers=self.headers)
        if resp.status_code != 200:
            raise Exception('Request to {} failed with code {} and response body {}'.format(resp.url, resp.status_code, resp.text))
        return resp.text

    def build_log(self, app_slug, build_slug):
        path = "{}apps/{}/builds/{}/log".format(self.base_url, app_slug, build_slug)
        resp = requests.get(path, headers=self.headers)
        if resp.status_code != 200:
            raise Exception('Request to {} failed with code {} and response body {}'.format(resp.url, resp.status_code, resp.text))
        return resp.text