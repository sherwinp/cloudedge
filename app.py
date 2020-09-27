from starlette.applications import Starlette
from starlette.routing import Mount, Route
from starlette.responses import FileResponse, JSONResponse
from starlette.staticfiles import StaticFiles

async def homepage(request):
    return FileResponse('dist/index.html')

async def auth(request):
    return JSONResponse({'token': 'world'})

routes = [
    Route('/auth', auth),
    Route('/', homepage),
    Mount('/', app=StaticFiles(directory='dist'))
]

app = Starlette(debug=True, routes=routes)

