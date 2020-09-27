from starlette.applications import Starlette
from starlette.routing import Mount, Route
from starlette.responses import FileResponse, JSONResponse
from starlette.staticfiles import StaticFiles

async def homepage(request):
    auth_header = None
    try:
      auth_header = request.headers["Authorization"]
    except KeyError:
      pass
    if auth_header:
        return FileResponse('dist/secured.html')
    return FileResponse('dist/index.html')

async def auth(request):
    result = 'world';
    auth_header = request.headers["Authorization"]
    if auth_header:
        result = 'known';
    return JSONResponse({'token': result })

routes = [
    Route('/auth', auth),
    Route('/', homepage),
    Mount('/', app=StaticFiles(directory='dist'))
]

app = Starlette(debug=True, routes=routes)

