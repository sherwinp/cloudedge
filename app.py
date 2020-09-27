from starlette.applications import Starlette
from starlette.routing import Mount, Route
from starlette.responses import FileResponse, JSONResponse
from starlette.staticfiles import StaticFiles

def isInRole(request, role=''):
    auth_header = None
    try:
      auth_header = request.headers["Authorization"]
      return True
    except KeyError:
      pass
    return True

async def homepage(request):
    if isInRole(request):
        return FileResponse('dist/secured.html')
    return FileResponse('dist/index.html')

async def authorize(request):
    if isInRole(request):
        result = 'known';
    return JSONResponse({'token': result })

async def authenticate(request):
    if isInRole(request):
        result = 'known';
    return JSONResponse({'token': result })

routes = [
    Route('/authorize', authorize),
    Route('/authenticate', authenticate),
    Route('/', homepage),
    Mount('/', app=StaticFiles(directory='dist'))
]

app = Starlette(debug=True, routes=routes)

