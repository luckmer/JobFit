class LLMModelError(Exception):
    """providerID and id are required"""

    def __init__(self, providerID, id):
        self.providerID = providerID
        self.id = id


class LLMClientError(Exception):
    """Client is not defined"""


class LLMClientUnknownType(Exception):
    """Unknown response"""


class LLMUnavailable(Exception):
    """opencode isn't running, unreachable, or returned an error."""
